"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Shield, Copy, Check, Terminal, Gamepad2, Key, Bell, Webhook, Zap, Code, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LUAU_SCRIPT = `-- ==========================================
-- ZENITH-GUARD: CORE ANTI-CHEAT SCRIPT v1.0
-- Put this inside ServerScriptService
-- ==========================================

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

-- ⚙️ CONFIGURATION
local ZENITH_API_URL = "https://zenith-guard-nine.vercel.app/api/v1/events"
local API_KEY = "YOUR_API_KEY_HERE" -- Replace with your actual API key from the dashboard

-- Internal state
local debounceList = {}

-- ==========================================
-- CORE: Report function
-- ==========================================
local function ReportExploit(player, alertType, severity, description, metadata)
    local debounceKey = player.UserId .. "_" .. alertType
    if debounceList[debounceKey] and tick() - debounceList[debounceKey] < 5 then
        return
    end
    debounceList[debounceKey] = tick()

    local payload = HttpService:JSONEncode({
        playerId = tostring(player.UserId),
        playerName = player.Name,
        type = alertType,
        severity = severity,
        description = description,
        data = metadata or {}
    })

    task.spawn(function()
        local success, response = pcall(function()
            return HttpService:PostAsync(
                ZENITH_API_URL,
                payload,
                Enum.HttpContentType.ApplicationJson,
                false,
                { ["Authorization"] = "Bearer " .. API_KEY }
            )
        end)

        if not success then
            warn("[Zenith-Guard] Failed to send report: " .. tostring(response))
        else
            print("[Zenith-Guard] Alert sent for " .. player.Name .. " (" .. alertType .. ")")
        end
    end)
end

-- ==========================================
-- DETECTION: Speed Hack & Jump Hack
-- ==========================================
local function MonitorCharacter(player, character)
    local humanoid = character:WaitForChild("Humanoid", 10)
    if not humanoid then return end

    local rootPart = character:WaitForChild("HumanoidRootPart", 10)
    if not rootPart then return end

    local lastPosition = rootPart.Position

    while character.Parent and humanoid.Parent do
        -- Speed Hack Detection
        if humanoid.WalkSpeed > 30 then
            ReportExploit(player, "Speed Hack", "high",
                "WalkSpeed is abnormally high: " .. tostring(math.floor(humanoid.WalkSpeed)))
        end

        -- Jump Hack Detection
        if humanoid.JumpPower > 60 then
            ReportExploit(player, "Jump Hack", "medium",
                "JumpPower is abnormally high: " .. tostring(math.floor(humanoid.JumpPower)))
        end

        -- Teleport / Noclip Detection (moved > 100 studs in 1 second)
        if rootPart.Parent then
            local currentPosition = rootPart.Position
            local distance = (currentPosition - lastPosition).Magnitude
            if distance > 100 then
                ReportExploit(player, "Teleport Hack", "critical",
                    "Player moved " .. tostring(math.floor(distance)) .. " studs in 1 second",
                    { from = tostring(lastPosition), to = tostring(currentPosition) })
            end
            lastPosition = currentPosition
        end

        -- Fly / Levitation Detection (airborne for too long without platform)
        if rootPart.Parent then
            local rayOrigin = rootPart.Position
            local rayDirection = Vector3.new(0, -20, 0)
            local raycastParams = RaycastParams.new()
            raycastParams.FilterType = Enum.RaycastFilterType.Exclude
            raycastParams.FilterDescendantsInstances = {character}

            local rayResult = workspace:Raycast(rayOrigin, rayDirection, raycastParams)
            if not rayResult and humanoid.FloorMaterial == Enum.Material.Air then
                -- Player is in the air with no ground beneath
                if not debounceList[player.UserId .. "_flying"] then
                    debounceList[player.UserId .. "_flying"] = tick()
                elseif tick() - debounceList[player.UserId .. "_flying"] > 3 then
                    ReportExploit(player, "Fly Hack", "critical",
                        "Player is levitating with no ground detected below for 3+ seconds")
                    debounceList[player.UserId .. "_flying"] = tick()
                end
            else
                debounceList[player.UserId .. "_flying"] = nil
            end
        end

        task.wait(1)
    end
end

-- ==========================================
-- DETECTION: Chat Scams & Toxicity
-- ==========================================
local function MonitorChat(player)
    player.Chatted:Connect(function(message)
        local lowerMsg = string.lower(message)
        if string.find(lowerMsg, "free robux")
            or string.find(lowerMsg, "bux.gg")
            or string.find(lowerMsg, "robuxify")
            or string.find(lowerMsg, "bloxflip") then
            ReportExploit(player, "Chat Scam", "critical",
                "Player sent a scam/phishing link in chat", { message = message })
        end
    end)
end

-- ==========================================
-- CONNECT ALL DETECTIONS
-- ==========================================
Players.PlayerAdded:Connect(function(player)
    MonitorChat(player)
    player.CharacterAdded:Connect(function(character)
        MonitorCharacter(player, character)
    end)
end)

print("[Zenith-Guard] ✅ Anti-Cheat v1.0 initialized and protecting the server.")`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="border-border bg-muted/50 hover:bg-muted text-foreground gap-2"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied!" : "Copy Script"}
    </Button>
  );
}

function StepCard({ step, icon: Icon, title, children }: { step: number; icon: any; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: step * 0.1 }}
      className="relative"
    >
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg shrink-0">
            {step}
          </div>
          <div className="w-px flex-1 bg-border mt-4" />
        </div>
        <div className="pb-12 flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          </div>
          <div className="text-muted-foreground space-y-3 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Zenith-Guard</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-border gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Code className="w-4 h-4" />
            <span>Developer Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Setup Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your Roblox game protected in under 5 minutes. Follow these steps to integrate Zenith-Guard into your game.
          </p>
        </motion.div>

        {/* What We Detect Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 p-8 rounded-2xl border border-border bg-card/50"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-primary" />
            What Does Zenith-Guard Detect?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Speed Hacks", desc: "Detects abnormal WalkSpeed modifications", severity: "High" },
              { name: "Fly / Levitation Hacks", desc: "Server-side raycast detects players floating with no ground", severity: "Critical" },
              { name: "Teleport / Noclip", desc: "Flags players who move 100+ studs in under 1 second", severity: "Critical" },
              { name: "Jump Hacks", desc: "Detects modified JumpPower exceeding normal limits", severity: "Medium" },
              { name: "Chat Scams & Phishing", desc: "Automatically flags scam links and phishing attempts", severity: "Critical" },
              { name: "Executor Injection", desc: "Detectable via client-side honeypots forwarded to our API", severity: "Critical" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border">
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5 ${
                  item.severity === "Critical" ? "bg-red-500/10 text-red-400" :
                  item.severity === "High" ? "bg-orange-500/10 text-orange-400" :
                  "bg-yellow-500/10 text-yellow-400"
                }`}>
                  {item.severity}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-0">
          <StepCard step={1} icon={Gamepad2} title="Register Your Game">
            <p>Log in to the <Link href="/dashboard" className="text-primary hover:underline">Zenith-Guard Dashboard</Link>, navigate to the <strong>Games</strong> tab in the sidebar, and click <strong>&quot;+ Add New Game&quot;</strong>.</p>
            <p>Enter your Roblox <strong>Game Name</strong> and <strong>Place ID</strong> (found in your game&apos;s URL on Roblox).</p>
          </StepCard>

          <StepCard step={2} icon={Key} title="Generate an API Key">
            <p>Go to the <strong>API Keys</strong> tab and click <strong>&quot;+ Generate New Key&quot;</strong>.</p>
            <p>Give it a name (e.g., &quot;Production Server&quot;) and select the game you just registered.</p>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm mt-2">
              <strong>⚠️ Important:</strong> Copy your API key immediately after generation. For security reasons, you will not be able to view the full key again.
            </div>
          </StepCard>

          <StepCard step={3} icon={Terminal} title="Enable HTTP Requests in Roblox Studio">
            <p>Open your game in <strong>Roblox Studio</strong>.</p>
            <p>Go to <code className="px-2 py-0.5 bg-muted rounded text-sm font-mono">Home → Game Settings → Security</code></p>
            <p>Turn <strong>ON</strong> the option: <strong>&quot;Allow HTTP Requests&quot;</strong>.</p>
          </StepCard>

          <StepCard step={4} icon={Code} title="Install the Anti-Cheat Script">
            <p>In the <strong>Explorer</strong> panel, right-click <strong>ServerScriptService</strong> and insert a new <strong>Script</strong>. Name it <code className="px-2 py-0.5 bg-muted rounded text-sm font-mono">ZenithGuardAntiCheat</code>.</p>
            <p>Paste the complete script below and replace <code className="px-2 py-0.5 bg-muted rounded text-sm font-mono">YOUR_API_KEY_HERE</code> with the key you generated in Step 2.</p>

            <div className="mt-4 rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-xs text-muted-foreground ml-2 font-mono">ZenithGuardAntiCheat.luau</span>
                </div>
                <CopyButton text={LUAU_SCRIPT} />
              </div>
              <pre className="p-4 overflow-x-auto text-sm leading-relaxed bg-background/80">
                <code className="text-muted-foreground font-mono text-xs">{LUAU_SCRIPT}</code>
              </pre>
            </div>
          </StepCard>

          <StepCard step={5} icon={Zap} title="Publish Your Game">
            <p>After pasting the script and replacing the API key, click <strong>File → Publish to Roblox</strong>.</p>
            <p>The script will begin monitoring your game immediately. Open your <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link> and watch the <strong>Live Feed</strong> for incoming events!</p>
          </StepCard>

          <StepCard step={6} icon={Webhook} title="(Optional) Setup Discord Alerts — Pro Feature">
            <p>Want real-time alerts sent to your Discord server?</p>
            <p>Go to <strong>Settings → Notifications &amp; Webhooks</strong>, select your game, and paste your <strong>Discord Webhook URL</strong>.</p>
            <p>Every time an exploit is detected, a beautiful embed with the exploiter&apos;s Roblox avatar, username, and details will be posted automatically to your channel.</p>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm mt-2">
              <strong>💡 Tip:</strong> Discord Webhooks are available on the Pro plan ($19/mo). <Link href="/register" className="underline">Upgrade here</Link>.
            </div>
          </StepCard>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-12 rounded-2xl border border-border bg-card/50"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to protect your game?</h2>
          <p className="text-muted-foreground mb-8">Create your free account and start securing your Roblox game today.</p>
          <Link href="/register">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 h-12 px-8 text-base">
              Get Started Free
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
