"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { motion } from "motion/react";
import { Key, Copy, Plus, Trash2, Code2, CheckCircle2, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getApiKeys, addApiKey, getGamesList } from "./actions";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [keysRes, gamesRes] = await Promise.all([getApiKeys(), getGamesList()]);
    if (keysRes.apiKeys) setKeys(keysRes.apiKeys);
    if (gamesRes.games) setGames(gamesRes.games);
    setLoading(false);
  };

  const handleAddKey = (formData: FormData) => {
    startTransition(async () => {
      const res = await addApiKey(formData);
      if (res?.success) {
        setOpen(false);
        formRef.current?.reset();
        await fetchData();
        // Automatically copy the newly generated key
        if (res.key) {
          copyToClipboard(res.key);
        }
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            API Keys & Integration
          </h1>
          <p className="text-muted-foreground mt-2">Manage access keys for connecting your Roblox servers to Zenith-Guard.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-0">
              <Plus className="mr-2 h-4 w-4" /> Generate New Key
            </Button>
          } />
          <DialogContent className="bg-background border-border text-foreground">
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
            </DialogHeader>
            <form action={handleAddKey} ref={formRef} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Key Name</label>
                <Input name="name" required placeholder="e.g. Production Server 1" className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Game</label>
                <select name="game_id" required className="flex h-10 w-full rounded-md border border-border bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="">-- Choose a Game --</option>
                  {games.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
                {games.length === 0 && <p className="text-xs text-destructive mt-1">Please create a game first before generating an API key.</p>}
              </div>
              <Button type="submit" disabled={isPending || games.length === 0} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isPending ? "Generating..." : "Generate Key"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card/50 backdrop-blur border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-card-foreground">
            <Key className="mr-2 h-5 w-5 text-cyan-500" />
            Active Keys
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-background/50">
              <TableRow className="border-border">
                <TableHead>Name</TableHead>
                <TableHead>Secret Key</TableHead>
                <TableHead>Game</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : keys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No API keys found. Generate one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                keys.map((item) => (
                  <TableRow key={item.id} className="border-border hover:bg-muted/30">
                    <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                    <TableCell className="font-mono text-muted-foreground flex items-center">
                      {item.key_hash.substring(0, 8)}...{item.key_hash.substring(item.key_hash.length - 4)}
                      <Button onClick={() => copyToClipboard(item.key_hash)} variant="ghost" size="icon" className="ml-2 h-6 w-6 text-muted-foreground hover:text-foreground">
                        {copiedKey === item.key_hash ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.games?.name || 'Unknown'}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-muted-foreground">{item.last_used_at ? new Date(item.last_used_at).toLocaleDateString() : 'Never'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80 hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="bg-card/50 backdrop-blur border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-card-foreground">
              <Code2 className="mr-2 h-5 w-5 text-blue-500" />
              Luau Integration
            </CardTitle>
            <CardDescription className="text-muted-foreground">Add this script to ServerScriptService</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-background/80 p-4 rounded-md border border-border overflow-x-auto">
              <pre className="text-sm font-mono text-muted-foreground">
                <code className="language-lua">
{`local HttpService = game:GetService("HttpService")
local API_URL = "https://api.zenith-guard.com/v1"
local API_KEY = "YOUR_API_KEY_HERE"

local function reportEvent(player, eventType, data)
    local payload = HttpService:JSONEncode({
        playerId = player.UserId,
        type = eventType,
        data = data
    })
    
    HttpService:PostAsync(
        API_URL .. "/events",
        payload,
        Enum.HttpContentType.ApplicationJson,
        false,
        { ["Authorization"] = "Bearer " .. API_KEY }
    )
end`}
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-card-foreground">
              <CheckCircle2 className="mr-2 h-5 w-5 text-purple-500" />
              REST API Endpoints
            </CardTitle>
            <CardDescription className="text-muted-foreground">Direct API access documentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-background/50 rounded-md border border-border">
              <Badge className="bg-blue-600 hover:bg-blue-600 text-white">GET</Badge>
              <span className="font-mono text-sm text-foreground">/v1/games/status</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-background/50 rounded-md border border-border">
              <Badge className="bg-green-600 hover:bg-green-600 text-white">POST</Badge>
              <span className="font-mono text-sm text-foreground">/v1/events</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-background/50 rounded-md border border-border">
              <Badge className="bg-yellow-600 text-black hover:bg-yellow-500">PUT</Badge>
              <span className="font-mono text-sm text-foreground">/v1/players/:id/status</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
