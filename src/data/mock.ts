// src/data/mock.ts
// Mock data for Zenith-Guard platform

export const mockUser = {
  id: "usr_01HXYZ1234",
  username: "ZenithAdmin",
  email: "admin@zenith-guard.io",
  role: "OWNER",
  twoFactorEnabled: true,
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
};

export const mockGames = [
  { id: "g_1", name: "Phantom Forces Arena", placeId: "4582910473", activePlayers: 14203, players: 14203, dailyActiveUsers: 89000, riskScore: 12, securityScore: 88, status: "Healthy", serverCount: 24, servers: 24, detectionCount: 47, detections: 47 },
  { id: "g_2", name: "Royal Kingdom RPG", placeId: "7291058234", activePlayers: 8432, players: 8432, dailyActiveUsers: 45000, riskScore: 8, securityScore: 92, status: "Healthy", serverCount: 12, servers: 12, detectionCount: 18, detections: 18 },
  { id: "g_3", name: "Neon City Roleplay", placeId: "3849201756", activePlayers: 21500, players: 21500, dailyActiveUsers: 120000, riskScore: 24, securityScore: 71, status: "Warning", serverCount: 38, servers: 38, detectionCount: 125, detections: 125 },
  { id: "g_4", name: "Galactic Tycoon", placeId: "9183746520", activePlayers: 3200, players: 3200, dailyActiveUsers: 18000, riskScore: 4, securityScore: 96, status: "Healthy", serverCount: 6, servers: 6, detectionCount: 5, detections: 5 }
];

export const mockDetectionEvents = [
  { id: "evt_1", type: "SPEED_HACK", severity: "CRITICAL", player: "NinjaShadow_99", gameId: "g_1", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), details: "Movement speed exceeded physics constraints by 400%" },
  { id: "evt_2", type: "FLY_HACK", severity: "CRITICAL", player: "DarkLord_X", gameId: "g_3", timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), details: "Vertical velocity sustained without ground contact" },
  { id: "evt_3", type: "CHAT_BYPASS", severity: "HIGH", player: "ToxicGamer123", gameId: "g_2", timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), details: "Attempted to bypass filter using zalgo text" },
  { id: "evt_4", type: "AUTO_CLICKER", severity: "MEDIUM", player: "ProBuilder2025", gameId: "g_4", timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), details: "Consistent 20 CPS detected over 15 seconds" },
  { id: "evt_5", type: "AURA_HACK", severity: "CRITICAL", player: "NoobSlayer_Elite", gameId: "g_1", timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), details: "Damage dealt to 5 entities simultaneously in 360 radius" },
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: `evt_${i + 6}`,
    type: ["EXPLOIT_INJECTION", "TELEPORT", "AIMBOT", "NOCLIP", "CHAT_SPAM"][Math.floor(Math.random() * 5)],
    severity: ["CRITICAL", "HIGH", "MEDIUM", "LOW"][Math.floor(Math.random() * 4)],
    player: `Player_${Math.floor(Math.random() * 10000)}`,
    gameId: `g_${Math.floor(Math.random() * 4) + 1}`,
    timestamp: new Date(Date.now() - 1000 * 60 * (60 + i * 15)).toISOString(),
    details: "Automated heuristic detection triggered."
  }))
];

export const mockPlayers = [
  { id: "p_1", userId: "184920194", username: "NinjaShadow_99", riskScore: 95, status: "Flagged", playtime: 120, joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), alerts: 14, lastSeen: "2 mins ago" },
  { id: "p_2", userId: "294018492", username: "DarkLord_X", riskScore: 82, status: "Flagged", playtime: 450, joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(), alerts: 7, lastSeen: "1 hour ago" },
  { id: "p_3", userId: "930184291", username: "FriendlyNoob", riskScore: 5, status: "Online", playtime: 15, joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), alerts: 0, lastSeen: "Just now" },
  { id: "p_4", userId: "481029481", username: "ProBuilder2025", riskScore: 45, status: "Offline", playtime: 1200, joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).toISOString(), alerts: 2, lastSeen: "3 days ago" },
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: `p_${i + 5}`,
    userId: Math.floor(Math.random() * 900000000 + 100000000).toString(),
    username: `RobloxUser_${Math.floor(Math.random() * 90000) + 10000}`,
    riskScore: Math.floor(Math.random() * 100),
    status: ["Online", "Offline", "Flagged", "Offline"][Math.floor(Math.random() * 4)],
    playtime: Math.floor(Math.random() * 2000),
    joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 400)).toISOString(),
    alerts: Math.floor(Math.random() * 5),
    lastSeen: ["Just now", "5 mins ago", "1 hour ago", "2 days ago"][Math.floor(Math.random() * 4)]
  }))
];

export const mockServers = [
  { id: "srv_us_east_1", region: "US-East", status: "ONLINE", cpu: 45, ram: 62, players: 120, uptime: "14d 5h" },
  { id: "srv_us_west_1", region: "US-West", status: "ONLINE", cpu: 78, ram: 85, players: 185, uptime: "2d 12h" },
  { id: "srv_eu_central_1", region: "EU-Central", status: "ONLINE", cpu: 32, ram: 45, players: 85, uptime: "30d 1h" },
  { id: "srv_eu_west_1", region: "EU-West", status: "ONLINE", cpu: 55, ram: 60, players: 140, uptime: "12d 8h" },
  { id: "srv_ap_tokyo_1", region: "AP-Tokyo", status: "DEGRADED", cpu: 95, ram: 92, players: 210, uptime: "5d 4h" },
  { id: "srv_ap_sydney_1", region: "AP-Sydney", status: "ONLINE", cpu: 25, ram: 35, players: 45, uptime: "60d 2h" },
  { id: "srv_sa_brazil_1", region: "SA-Brazil", status: "ONLINE", cpu: 65, ram: 70, players: 110, uptime: "8d 14h" },
  { id: "srv_us_central_1", region: "US-Central", status: "OFFLINE", cpu: 0, ram: 0, players: 0, uptime: "0d 0h" }
];

export const mockAlerts = [
  { id: "al_1", title: "Speed Hack Detected", description: "Movement speed exceeded physics constraints by 400%", severity: "Critical", player: "NinjaShadow_99", game: "Phantom Forces Arena", time: "15 min ago", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), read: false },
  { id: "al_2", title: "Mass Exploit Wave", description: "15 simultaneous speed hack triggers detected", severity: "Critical", player: "DarkLord_X", game: "Neon City Roleplay", time: "45 min ago", timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), read: false },
  { id: "al_3", title: "Fly Hack Detected", description: "Sustained vertical velocity without ground contact", severity: "High", player: "NoobSlayer_Elite", game: "Royal Kingdom RPG", time: "1 hour ago", timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), read: false },
  { id: "al_4", title: "Remote Event Spam", description: "500+ remote calls in under 10 seconds", severity: "High", player: "ToxicGamer123", game: "Phantom Forces Arena", time: "2 hours ago", timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), read: true },
  { id: "al_5", title: "Suspicious Currency Gain", description: "Player gained 10M coins in 30 seconds", severity: "Medium", player: "ProBuilder2025", game: "Galactic Tycoon", time: "3 hours ago", timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), read: true },
  { id: "al_6", title: "Noclip Movement", description: "Player passed through solid geometry", severity: "Medium", player: "RobloxUser_42981", game: "Neon City Roleplay", time: "5 hours ago", timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(), read: true },
  { id: "al_7", title: "Unusual Login Pattern", description: "Account accessed from 4 different regions in 1 hour", severity: "Low", player: "RobloxUser_71034", game: "Royal Kingdom RPG", time: "8 hours ago", timestamp: new Date(Date.now() - 1000 * 60 * 480).toISOString(), read: true },
  { id: "al_8", title: "System Update", description: "Heuristics engine updated to v2.4.1", severity: "Low", player: "System", game: "All Games", time: "1 day ago", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true }
];

export const mockDashboardStats = {
  totalPlayers: 47335,
  playersTrend: "+12.5%",
  activeThreats: 142,
  threatsTrend: "-5.2%",
  blockedExploits: 8492,
  exploitsTrend: "+24.8%",
  serverHealth: 98.5,
  healthTrend: "-0.2%"
};

export const mockModerationRecords = Array.from({ length: 12 }).map((_, i) => ({
  id: `mod_${i}`,
  targetPlayerId: `p_${Math.floor(Math.random() * 10) + 1}`,
  targetUsername: `RobloxUser_${Math.floor(Math.random() * 90000) + 10000}`,
  moderatorId: "usr_01HXYZ1234",
  moderatorName: "ZenithAdmin",
  action: ["BAN", "KICK", "MUTE", "WARN"][Math.floor(Math.random() * 4)],
  reason: ["Exploiting", "Toxicity", "Spam", "Inappropriate Content"][Math.floor(Math.random() * 4)],
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * (i * 5 + 1)).toISOString(),
  duration: ["PERMANENT", "7_DAYS", "1_DAY", "1_HOUR"][Math.floor(Math.random() * 4)],
  status: "ACTIVE"
}));

export const mockWebhooks = [
  { id: "wh_1", name: "Discord Security Alerts", url: "https://discord.com/api/webhooks/...", events: ["alert.critical", "alert.high"], active: true },
  { id: "wh_2", name: "Slack Moderation Feed", url: "https://hooks.slack.com/services/...", events: ["moderation.ban", "moderation.kick"], active: true },
  { id: "wh_3", name: "Internal Data Lake", url: "https://api.zenith-guard.io/v1/ingest", events: ["*"], active: false }
];

export const mockChildSafetyRatings = {
  chatFilterEffectiveness: 99.4,
  inappropriateContentBlocks: 1420,
  reportedUsers: 85,
  autoModeratedMessages: 34500,
  overallScore: 98
};

export const mockSystemHealth = {
  apiLatency: 45,
  databaseLoad: 32,
  cacheHitRatio: 94.5,
  activeConnections: 12500,
  status: "OPERATIONAL",
  lastDeployment: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
};

export const mockFeatureFlags = {
  enableNewHeuristics: true,
  betaAnalyticsDash: false,
  advancedChatFilter: true
};

export const mockAnnouncements = [
  { id: "a_1", title: "New Heuristics Engine Live", date: new Date().toISOString() },
  { id: "a_2", title: "Scheduled Maintenance this weekend", date: new Date(Date.now() - 86400000).toISOString() }
];

export const mockNotifications = [
  { id: "n_1", message: "User DarkLord_X has been permanently banned.", read: false },
  { id: "n_2", message: "Weekly summary report is available.", read: true }
];

// Chart Data Generators
export const generateDetectionTimeline = (hours = 24) => {
  return Array.from({ length: hours }).map((_, i) => {
    const time = new Date(Date.now() - 1000 * 60 * 60 * (hours - i - 1));
    return {
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      exploits: Math.floor(Math.random() * 50) + 10,
      chatBypass: Math.floor(Math.random() * 30) + 5,
      botting: Math.floor(Math.random() * 20) + 2
    };
  });
};

export const generateAlertsPerHour = (hours = 24) => {
  return Array.from({ length: hours }).map((_, i) => {
    const time = new Date(Date.now() - 1000 * 60 * 60 * (hours - i - 1));
    return {
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      alerts: Math.floor(Math.random() * 15)
    };
  });
};

export const mockAnalyticsData = generateDetectionTimeline(24);

export const mockApiKeys = [
  { id: "key_1", name: "Production Server", key: "zg_live_****************************a3f1", game: "Phantom Forces Arena", created: "2026-06-15", lastUsed: "2 hours ago", status: "Active" },
  { id: "key_2", name: "Staging Server", key: "zg_test_****************************b2d4", game: "Royal Kingdom RPG", created: "2026-07-01", lastUsed: "1 day ago", status: "Active" },
  { id: "key_3", name: "Development", key: "zg_dev_*****************************e7c8", game: "Neon City Roleplay", created: "2026-07-10", lastUsed: "5 min ago", status: "Active" },
  { id: "key_4", name: "Legacy Key", key: "zg_old_*****************************9a12", game: "Galactic Tycoon", created: "2026-01-20", lastUsed: "30 days ago", status: "Inactive" },
];

export const mockAuditLog = [
  { id: "audit_1", user: "ZenithAdmin", action: "Created API Key", target: "Production Server", timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: "audit_2", user: "ZenithAdmin", action: "Updated Security Rules", target: "Phantom Forces Arena", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: "audit_3", user: "ModeratorJane", action: "Banned Player", target: "DarkLord_X", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: "audit_4", user: "ZenithAdmin", action: "Modified Webhook", target: "Discord Security Alerts", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
  { id: "audit_5", user: "System", action: "Auto-banned Player", target: "NinjaShadow_99", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
  { id: "audit_6", user: "ZenithAdmin", action: "Rotated API Key", target: "Staging Server", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString() },
  { id: "audit_7", user: "System", action: "Heuristics Update", target: "Engine v2.4.1", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: "audit_8", user: "ModeratorJane", action: "Reviewed Appeal", target: "ProBuilder2025", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString() },
  { id: "audit_9", user: "ZenithAdmin", action: "Changed Subscription", target: "Enterprise Plan", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString() },
  { id: "audit_10", user: "System", action: "Backup Completed", target: "Database", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
];

export const mockAdminUsers = [
  { id: "u_1", name: "ZenithAdmin", email: "admin@zenith-guard.io", role: "Owner", subscription: "Enterprise", status: "Active", created: "2026-01-15" },
  { id: "u_2", name: "ModeratorJane", email: "jane@example.com", role: "Moderator", subscription: "Pro", status: "Active", created: "2026-03-01" },
  { id: "u_3", name: "DevStudio_Alpha", email: "alpha@devstudio.gg", role: "User", subscription: "Pro", status: "Active", created: "2026-04-10" },
  { id: "u_4", name: "RobloxCreator42", email: "creator42@mail.com", role: "User", subscription: "Free", status: "Active", created: "2026-05-20" },
  { id: "u_5", name: "GameDevPro", email: "pro@gamedev.co", role: "User", subscription: "Enterprise", status: "Active", created: "2026-02-28" },
  { id: "u_6", name: "TestAccount", email: "test@example.com", role: "User", subscription: "Free", status: "Suspended", created: "2026-06-01" },
  { id: "u_7", name: "BuilderKing", email: "king@builders.dev", role: "User", subscription: "Pro", status: "Active", created: "2026-06-15" },
  { id: "u_8", name: "StudioNova", email: "nova@studio.io", role: "Admin", subscription: "Enterprise", status: "Active", created: "2026-01-30" },
];
