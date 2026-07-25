"use client";

import { motion } from "motion/react";
import { User, Bell, Shield, Trash2, Mail, Lock, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect, useTransition } from "react";
import { Loader2, Check } from "lucide-react";
import { getGamesWithWebhooks, saveDiscordWebhook } from "./actions";

export default function SettingsPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const [selectedGameId, setSelectedGameId] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoadingGames(true);
    const res = await getGamesWithWebhooks();
    if (res.games) {
      setGames(res.games);
      if (res.games.length > 0) {
        selectGame(res.games[0].id, res.games);
      }
    }
    setLoadingGames(false);
  };

  const selectGame = (gameId: string, gamesList = games) => {
    setSelectedGameId(gameId);
    const game = gamesList.find(g => g.id === gameId);
    if (game) {
      setWebhookUrl(game.discord_webhook || "");
      setWebhookEnabled(!!game.discord_webhook);
    }
    setSaveSuccess(false);
  };

  const handleSaveWebhook = () => {
    if (!selectedGameId) return;
    
    startTransition(async () => {
      const formData = new FormData();
      formData.append('game_id', selectedGameId);
      formData.append('webhook_url', webhookUrl);
      formData.append('enabled', String(webhookEnabled));
      
      const res = await saveDiscordWebhook(formData);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        // Refresh games list in background
        const gRes = await getGamesWithWebhooks();
        if (gRes.games) setGames(gRes.games);
      }
    });
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Account Settings
        </h1>
        <p className="text-muted-foreground mt-2">Manage your account preferences and security configurations.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-card-foreground">
                <User className="mr-2 h-5 w-5 text-blue-500" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20 border-2 border-border">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                    ZG
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="border-border bg-background hover:bg-muted">Change Avatar</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <Input defaultValue="Admin User" className="bg-muted border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <Input defaultValue="admin@zenith-guard.com" type="email" className="bg-muted border-border" />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-card-foreground">
                <Bell className="mr-2 h-5 w-5 text-yellow-500" />
                Notifications & Webhooks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-foreground flex items-center"><Mail className="mr-2 h-4 w-4" /> Email Alerts</h4>
                  <p className="text-sm text-muted-foreground">Receive email for critical security events.</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="h-px bg-border my-4" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium text-foreground flex items-center"><Webhook className="mr-2 h-4 w-4" /> Discord Webhook (Pro Only)</h4>
                    <p className="text-sm text-muted-foreground">Send alerts to a Discord channel per game.</p>
                  </div>
                  <Switch checked={webhookEnabled} onCheckedChange={setWebhookEnabled} disabled={loadingGames || games.length === 0} />
                </div>
                
                {loadingGames ? (
                  <div className="flex justify-center p-4"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
                ) : games.length === 0 ? (
                  <p className="text-sm text-destructive">You must add a game first before configuring webhooks.</p>
                ) : (
                  <div className="space-y-4 bg-background/50 p-4 rounded-md border border-border">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Select Game</label>
                      <select 
                        value={selectedGameId} 
                        onChange={(e) => selectGame(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-border bg-muted px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                      >
                        {games.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Webhook URL</label>
                      <Input 
                        placeholder="https://discord.com/api/webhooks/..." 
                        className="bg-muted border-border text-sm" 
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        disabled={!webhookEnabled}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSaveWebhook} 
                      disabled={isPending || (!webhookEnabled && !webhookUrl)} 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : saveSuccess ? <Check className="mr-2 h-4 w-4" /> : null}
                      {saveSuccess ? "Saved!" : "Save Webhook Settings"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-card-foreground">
                <Shield className="mr-2 h-5 w-5 text-emerald-500" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-foreground">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="outline" className="border-border">Enable 2FA</Button>
              </div>
              <div className="h-px bg-border my-4" />
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground flex items-center"><Lock className="mr-2 h-4 w-4" /> Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="password" placeholder="Current Password" className="bg-muted border-border" />
                  <Input type="password" placeholder="New Password" className="bg-muted border-border" />
                </div>
                <Button className="bg-muted hover:bg-muted/80 text-foreground border border-border">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-destructive/10 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center">
                <Trash2 className="mr-2 h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-destructive/80">Permanently delete your account and all associated data.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Delete Account</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
